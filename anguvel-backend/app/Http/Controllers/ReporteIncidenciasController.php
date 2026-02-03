<?php

namespace App\Http\Controllers;

use App\Models\Reporte_Incidencias;
use Illuminate\Http\Request;
use App\Http\Resources\ReporteIncidenciasResource;
use Illuminate\Support\Facades\Storage;

class ReporteIncidenciasController extends Controller
{
    public function index()
    {
        // Trae los más nuevos primero, incluyendo la relación con el usuario si la necesitan
        return ReporteIncidenciasResource::collection(Reporte_Incidencias::with('usuario')->latest()->get());
    }

    public function store(Request $request) 
    {
        // 1. Validar TODO incluyendo el id_usuario
        $validado = $request->validate([
            'id_usuario'           => 'required|exists:usuarios,id_usuario', // Clave para la relación
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
            'foto_adjunta'         => 'nullable|image|max:2048', // Validación de imagen
        ]);

        // 2. Manejar la foto
        if ($request->hasFile('foto_adjunta')) {
            // Guarda en storage/app/public/incidencias
            $ruta = $request->file('foto_adjunta')->store('incidencias', 'public');
            $validado['foto_adjunta'] = $ruta;
        }

        // 3. Crear el registro
        try {
            // Como id_usuario está en $validado y en el $fillable del modelo, se guardará solo
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
