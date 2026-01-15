<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tramites_Licencias extends Model
{
    use HasFactory;

    protected $table = 'tramites_licencias';
    protected $primaryKey = 'id_tramites_licencias';

    public $timestamps = false;

    protected $fillable = [
        // seguimiento expediente, estado de solicitudes (como licencias de funcionamiento)
        'numero_expediente',
        'tipo_licencia',
        'area_responsable',
        'fecha_solicitud',
        'estado_solicitud',
        'descripcion_solicitud',
        'fecha_inicio',
        'dias_atraso',
        'fecha_fin',

        // reserva para atencion presencial o veterinaria
        'especialidad',
        'fecha_reserva',
        'hora_reserva',
        'estado_reserva',
        'requisitos',

        // TUPA digital
        'nombre_tramite',
        'costo_uit',
        'plazo_respuesta',
        'fecha_emision',
        'fecha_vencimiento',
        'enlace_pdf',
    ];


}
