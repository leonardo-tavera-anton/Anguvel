<?php

namespace App\Http\Controllers;

use App\Models\Consulta_Proyecto;
use Illuminate\Http\Request;
use App\Http\Resources\ConsultaProyectoResource;

class ConsultaProyectoController extends Controller
{
    public function index()
    {
        return ConsultaProyectoResource::collection(Consulta_Proyecto::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'codigo_snip' => 'sometimes|string|max:255',
            'nombre_obra' => 'sometimes|string|max:255',
            'presupuesto' => 'sometimes|numeric',
            'fecha_inicio' => 'sometimes|date',
            'fecha_fin' => 'sometimes|date',
            'avance_fisico' => 'sometimes|numeric',
            'avance_financiero' => 'sometimes|numeric',
            'fecha_estimada_fin' => 'sometimes|date',
            'ruc' => 'sometimes|string|max:255',
            'razon_social' => 'sometimes|string|max:255',
            'nombre_supervisor' => 'sometimes|string|max:255',
            'foto_antes' => 'sometimes|string|max:255',
            'foto_durante' => 'sometimes|string|max:255',
            'foto_finalizada' => 'sometimes|string|max:255',
            'fecha_antes_obra' => 'sometimes|date',
            'fecha_durante_obra' => 'sometimes|date',
            'fecha_finalizada_obra' => 'sometimes|date',
        ]);

        $proyecto = Consulta_Proyecto::create($validated);

        return new ConsultaProyectoResource($proyecto);
    }

    public function show(Consulta_Proyecto $proyecto)
    {
        return new ConsultaProyectoResource($proyecto);
    }

    public function update(Request $request, Consulta_Proyecto $proyecto)
    {
        $validated = $request->validate([
            'codigo_snip' => 'sometimes|string|max:255',
            'nombre_obra' => 'sometimes|string|max:255',
            'presupuesto' => 'sometimes|numeric',
            'fecha_inicio' => 'sometimes|date',
            'fecha_fin' => 'sometimes|date',
            'avance_fisico' => 'sometimes|numeric',
            'avance_financiero' => 'sometimes|numeric',
            'fecha_estimada_fin' => 'sometimes|date',
            'ruc' => 'sometimes|string|max:255',
            'razon_social' => 'sometimes|string|max:255',
            'nombre_supervisor' => 'sometimes|string|max:255',
            'foto_antes' => 'sometimes|string|max:255',
            'foto_durante' => 'sometimes|string|max:255',
            'foto_finalizada' => 'sometimes|string|max:255',
            'fecha_antes_obra' => 'sometimes|date',
            'fecha_durante_obra' => 'sometimes|date',
            'fecha_finalizada_obra' => 'sometimes|date',
        ]);

        $proyecto->update($validated);

        return new ConsultaProyectoResource($proyecto);
    }

    public function destroy(Consulta_Proyecto $proyecto)
    {
        $proyecto->delete();

        return response()->json(null, 204);
    }
}