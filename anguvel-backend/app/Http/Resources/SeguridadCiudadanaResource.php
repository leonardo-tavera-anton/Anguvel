<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SeguridadCiudadanaResource extends JsonResource
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
            'id_seguridad_ciudadana' => $this->id_seguridad_ciudadana,
            'id_usuario' => $this->id_usuario,
            'ubicacion' => $this->ubicacion,
            'tipo_riesgo' => $this->tipo_riesgo,
            'fecha_riesgo' => $this->fecha_riesgo,
            'hora_riesgo' => $this->hora_riesgo,
            'descripcion' => $this->descripcion,
            'nombre_entidad' => $this->nombre_entidad,
            'direccion' => $this->direccion,
            'telefono' => $this->telefono,
            'correo' => $this->correo,
            'ubicacion_riesgo' => $this->ubicacion_riesgo,
        ];
    }
}
