<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gestion_Tributaria_Pagos extends Model
{
    use HasFactory;

    protected $table = 'gestion_tributaria_pagos';
    protected $primaryKey = 'id_gestion_tributaria_pago';
    public $timestamps = false;
    
    protected $fillable = [
        // estado cuenta, para deudas pendientes
        'codigo_contribuyente',
        'periodo_tributario',
        'tipo_impuesto',
        'monto_pago',
        'fecha_pago',
        'metodo_pago',
        'estado_cuenta',
    
        // recibos digitales, historial de pagos realizados
        'numero_recibo',
        'fecha_emision',
        'importe_total',
        'detalle_servicios',
        'enlace_pdf',

        // beneficios tributarios, exoneraciones, descuentos
        'tipo_beneficio',
        'descripcion_beneficio',
        'descuento_aplicado',
        'vigencia_beneficio',
    ];
}
