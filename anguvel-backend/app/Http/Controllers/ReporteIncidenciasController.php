<?php

namespace App\Http\Controllers;

use App\Models\Reporte_Incidencias;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReporteIncidenciasController extends Controller
{
    public function index() {
        // 'with(usuario)' evita el problema de las N+1 consultas
        $reportes = Reporte_Incidencias::with('usuario')
                    ->orderBy('id_reporte_incidencia', 'desc')
                    ->get();
        return response()->json($reportes);
    }

    public function store(Request $request) 
    {
        $validado = $request->validate([
            'id_usuario'           => 'required|exists:usuarios,id_usuario',
            'numero_ticket'        => 'required|unique:reporte_incidencias,numero_ticket',
            'categoria'            => 'required|string',
            'subcategoria'         => 'required|string',
            'latitud'              => 'required',
            'longitud'             => 'required',
            'ubicacion_incidencia' => 'required',
            'descripcion'          => 'required',
            'fecha_incidencia'     => 'required|date',
            'hora_incidencia'      => 'required',
            'foto_adjunta'         => 'nullable|image|max:4096', // Aumentado a 4MB
        ]);

        // Asignar estado por defecto si no viene en el request
        $validado['estado'] = $request->input('estado', 'pendiente');

        if ($request->hasFile('foto_adjunta')) {
            // Guarda en storage/app/public/incidencias
            $ruta = $request->file('foto_adjunta')->store('incidencias', 'public');
            $validado['foto_adjunta'] = $ruta;
        }

        try {
            $reporte = Reporte_Incidencias::create($validado); 
            return response()->json([
                'mensaje' => 'Reporte creado correctamente',
                'data' => $reporte
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al guardar el reporte',
                'detalle' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $incidencia = Reporte_Incidencias::findOrFail($id);
        
        // Borrar la foto del disco si existe
        if ($incidencia->foto_adjunta) {
            Storage::disk('public')->delete($incidencia->foto_adjunta);
        }

        $incidencia->delete();
        return response()->json(['mensaje' => 'Reporte eliminado'], 200);
    }
}