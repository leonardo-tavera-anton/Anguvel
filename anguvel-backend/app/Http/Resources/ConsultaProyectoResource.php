<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsultaProyectoResource extends JsonResource
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
            'id_consulta_proyecto' => $this->id_consulta_proyecto,
            'codigo_snip' => $this->codigo_snip,
            'nombre_obra' => $this->nombre_obra,
            'presupuesto' => $this->presupuesto,
            'fecha_inicio' => $this->fecha_inicio,
            'fecha_fin' => $this->fecha_fin,
            'avance_fisico' => $this->avance_fisico,
            'avance_financiero' => $this->avance_financiero,
            'fecha_estimada_fin' => $this->fecha_estimada_fin,
            'ruc' => $this->ruc,
            'razon_social' => $this->razon_social,
            'nombre_supervisor' => $this->nombre_supervisor,
            'foto_antes' => $this->foto_antes,
            'foto_durante' => $this->foto_durante,
            'foto_finalizada' => $this->foto_finalizada,
            'fecha_antes_obra' => $this->fecha_antes_obra,
            'fecha_durante_obra' => $this->fecha_durante_obra,
            'fecha_finalizada_obra' => $this->fecha_finalizada_obra,
        ];
    }
}
