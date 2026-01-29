<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReporteIncidenciasResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_reporte_incidencia' => $this->id_reporte_incidencia,
            'categoria' => $this->categoria,
            'descripcion' => $this->descripcion,
            'ubicacion_incidencia' => $this->ubicacion_incidencia,
            'latitud' => $this->latitud,
            'longitud'=> $this->longitud,
            'fecha_incidencia' => $this->fecha_incidencia,
            'hora_incidencia' => $this->hora_incidencia,
            'foto_adjunta' => $this->foto_adjunta,
            'numero_ticket' => $this->numero_ticket,
            'estado' => $this->estado,
        ];
    }
}
