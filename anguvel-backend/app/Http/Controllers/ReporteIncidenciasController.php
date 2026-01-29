<?php

namespace App\Http\Controllers;

use App\Models\Reporte_Incidencias;
use Illuminate\Http\Request;
use App\Http\Resources\ReporteIncidenciasResource;

class ReporteIncidenciasController extends Controller
{
    public function index()
    {
        // Trae los más nuevos primero
        return ReporteIncidenciasResource::collection(Reporte_Incidencias::latest()->get());
    }

    public function store(Request $request) 
    {
        // 1. Validar TODO lo que viene de Angular
        $validado = $request->validate([
            'numero_ticket'        => 'required|unique:reporte_incidencias,numero_ticket',
            'categoria'            => 'required|string',
            'subcategoria'         => 'required|string',
            'latitud'              => 'required',
            'longitud'             => 'required',
            'ubicacion_incidencia' => 'required',
            'descripcion'          => 'required',
            'estado'               => 'nullable|string',
            'fecha_incidencia'     => 'nullable|date',
            'hora_incidencia'      => 'nullable',
        ]);

        // 2. Manejar la foto (Si Angular envía el archivo)
        if ($request->hasFile('foto_adjunta')) {
            // Se guarda en storage/app/public/incidencias
            $ruta = $request->file('foto_adjunta')->store('incidencias', 'public');
            $validado['foto_adjunta'] = $ruta;
        }

        // 3. Crear el registro
        try {
            $reporte = Reporte_Incidencias::create($validado); 
            return response()->json([
                'mensaje' => '¡Reporte ciudadano registrado!',
                'ticket'  => $reporte->numero_ticket,
                'data'    => $reporte
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al guardar en BD',
                'detalle' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Reporte_Incidencias $reporte_incidencia)
    {
        return new ReporteIncidenciasResource($reporte_incidencia);
    }

    public function destroy($id)
    {
        $incidencia = Reporte_Incidencias::findOrFail($id);
        $incidencia->delete();
        return response()->json(['mensaje' => 'Eliminado'], 204);
    }
}