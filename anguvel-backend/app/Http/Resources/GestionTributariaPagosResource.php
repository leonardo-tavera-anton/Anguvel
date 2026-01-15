<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GestionTributariaPagosResource extends JsonResource
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
            'id_gestion_tributaria_pago' => $this->id_gestion_tributaria_pago,
            'codigo_contribuyente' => $this->codigo_contribuyente,
            'periodo_tributario' => $this->periodo_tributario,
            'tipo_impuesto' => $this->tipo_impuesto,
            'monto_pago' => $this->monto_pago,
            'fecha_pago' => $this->fecha_pago,
            'metodo_pago' => $this->metodo_pago,
            'estado_cuenta' => $this->estado_cuenta,
            'numero_recibo' => $this->numero_recibo,
            'fecha_emision' => $this->fecha_emision,
            'importe_total' => $this->importe_total,
            'detalle_servicios' => $this->detalle_servicios,
            'enlace_pdf' => $this->enlace_pdf,
            'tipo_beneficio' => $this->tipo_beneficio,
            'descripcion_beneficio' => $this->descripcion_beneficio,
            'descuento_aplicado' => $this->descuento_aplicado,
            'vigencia_beneficio' => $this->vigencia_beneficio,
        ];
    }
}
