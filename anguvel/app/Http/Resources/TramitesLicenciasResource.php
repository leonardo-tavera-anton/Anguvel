<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TramitesLicenciasResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id_tramites_licencias,
            'numero_expediente' => $this->numero_expediente,
            'tipo_licencia' => $this->tipo_licencia,
            'area_responsable' => $this->area_responsable,
            'fecha_solicitud' => $this->fecha_solicitud,
            'estado_solicitud' => $this->estado_solicitud,
            'descripcion_solicitud' => $this->descripcion_solicitud,
            'fecha_inicio' => $this->fecha_inicio,
            'dias_atraso' => $this->dias_atraso,
            'fecha_fin' => $this->fecha_fin,
            'especialidad' => $this->especialidad,
            'fecha_reserva' => $this->fecha_reserva,
            'hora_reserva' => $this->hora_reserva,
            'estado_reserva' => $this->estado_reserva,
            'requisitos' => $this->requisitos,
            'nombre_tramite' => $this->nombre_tramite,
            'costo_uit' => $this->costo_uit,
            'plazo_respuesta' => $this->plazo_respuesta,
            'fecha_emision' => $this->fecha_emision,
            'fecha_vencimiento' => $this->fecha_vencimiento,
            'enlace_pdf' => $this->enlace_pdf,
        ];
    }
}
