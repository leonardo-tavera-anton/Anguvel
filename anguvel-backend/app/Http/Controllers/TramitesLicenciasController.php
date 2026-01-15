<?php

namespace App\Http\Controllers;

use App\Models\Tramites_Licencias;
use Illuminate\Http\Request;
use App\Http\Resources\TramitesLicenciasResource;

class TramitesLicenciasController extends Controller
{
    public function index()
    {
        return TramitesLicenciasResource::collection(Tramites_Licencias::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'numero_expediente' => 'sometimes|string|max:255',
            'tipo_licencia' => 'sometimes|string|max:255',
            'area_responsable' => 'sometimes|string|max:255',
            'fecha_solicitud' => 'sometimes|date',
            'estado_solicitud' => 'sometimes|string|max:255',
            'descripcion_solicitud' => 'sometimes|string',
            'fecha_inicio' => 'sometimes|date',
            'dias_atraso' => 'sometimes|integer',
            'fecha_fin' => 'sometimes|date',
            'especialidad' => 'sometimes|string|max:255',
            'fecha_reserva' => 'sometimes|date',
            'hora_reserva' => 'sometimes|date_format:H:i',
            'estado_reserva' => 'sometimes|string|max:255',
            'requisitos' => 'sometimes|string',
            'nombre_tramite' => 'sometimes|string|max:255',
            'costo_uit' => 'sometimes|numeric',
            'plazo_respuesta' => 'sometimes|string|max:255',
            'fecha_emision' => 'sometimes|date',
            'fecha_vencimiento' => 'sometimes|date',
            'enlace_pdf' => 'sometimes|string|max:255',
        ]);

        $tramite = Tramites_Licencias::create($validated);

        return new TramitesLicenciasResource($tramite);
    }

    public function show(Tramites_Licencias $tramite)
    {
        return new TramitesLicenciasResource($tramite);
    }

    public function update(Request $request, Tramites_Licencias $tramite)
    {
        $validated = $request->validate([
            'numero_expediente' => 'sometimes|string|max:255',
            'tipo_licencia' => 'sometimes|string|max:255',
            'area_responsable' => 'sometimes|string|max:255',
            'fecha_solicitud' => 'sometimes|date',
            'estado_solicitud' => 'sometimes|string|max:255',
            'descripcion_solicitud' => 'sometimes|string',
            'fecha_inicio' => 'sometimes|date',
            'dias_atraso' => 'sometimes|integer',
            'fecha_fin' => 'sometimes|date',
            'especialidad' => 'sometimes|string|max:255',
            'fecha_reserva' => 'sometimes|date',
            'hora_reserva' => 'sometimes|date_format:H:i',
            'estado_reserva' => 'sometimes|string|max:255',
            'requisitos' => 'sometimes|string',
            'nombre_tramite' => 'sometimes|string|max:255',
            'costo_uit' => 'sometimes|numeric',
            'plazo_respuesta' => 'sometimes|string|max:255',
            'fecha_emision' => 'sometimes|date',
            'fecha_vencimiento' => 'sometimes|date',
            'enlace_pdf' => 'sometimes|string|max:255',
        ]);

        $tramite->update($validated);

        return new TramitesLicenciasResource($tramite);
    }

    public function destroy(Tramites_Licencias $tramite)
    {
        $tramite->delete();

        return response()->json(null, 204);
    }
}
