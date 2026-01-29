<?php

namespace App\Http\Controllers;

use App\Models\Reporte_Incidencias;
use Illuminate\Http\Request;
use App\Http\Resources\ReporteIncidenciasResource;

class ReporteIncidenciasController extends Controller
{
    public function index()
    {
        return ReporteIncidenciasResource::collection(Reporte_Incidencias::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'categoria' => 'sometimes|string|max:255',
            'descripcion' => 'sometimes|string',
            'ubicacion_incidencia' => 'sometimes|string|max:255',
            'latitud' => 'sometimes|string|max:255',
            'longitud' => 'sometimes|string|max:255',
            'fecha_incidencia' => 'sometimes|date',
            'hora_incidencia' => 'sometimes|date_format:H:i',
            'foto_adjunta' => 'sometimes|string|max:255', // url
            'numero_ticket' => 'sometimes|string|max:255',
            'estado' => 'sometimes|string|max:255',
        ]);

        $incidencia = Reporte_Incidencias::create($validated);

        return new ReporteIncidenciasResource($incidencia);
    }

    public function show(Reporte_Incidencias $incidencia)
    {
        return new ReporteIncidenciasResource($incidencia);
    }

    public function update(Request $request, Reporte_Incidencias $incidencia)
    {
        $validated = $request->validate([
            'categoria' => 'sometimes|string|max:255',
            'descripcion' => 'sometimes|string',
            'ubicacion_incidencia' => 'sometimes|string|max:255',
            'fecha_incidencia' => 'sometimes|date',
            'hora_incidencia' => 'sometimes|date_format:H:i',
            'foto_adjunta' => 'sometimes|string|max:255',
            'numero_ticket' => 'sometimes|string|max:255',
            'estado' => 'sometimes|string|max:255',
            'ubicacion_mapa' => 'sometimes|string|max:255',
            'empresa_ejecutora' => 'sometimes|string|max:255',
            'fecha_inicio' => 'sometimes|date',
            'fecha_fin' => 'sometimes|date',
        ]);

        $incidencia->update($validated);

        return new ReporteIncidenciasResource($incidencia);
    }

    public function destroy(Reporte_Incidencias $incidencia)
    {
        $incidencia->delete();

        return response()->json(null, 204);
    }
}
