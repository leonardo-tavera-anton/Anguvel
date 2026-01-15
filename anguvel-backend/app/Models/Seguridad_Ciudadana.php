<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seguridad_Ciudadana extends Model
{
    use HasFactory;

    protected $table = 'seguridad_ciudadana';
    protected $primaryKey = 'id_seguridad_ciudadana';
    public $timestamps = false;
    
    protected $fillable = [
        // boton de panico, alerta inmediata a la central de monitoreo
        'id_usuario',
        'ubicacion',
        'tipo_riesgo',
        'fecha_riesgo',
        'hora_riesgo',
        'descripcion',

        // directorio de emergencia, numero de contacto de comisaria y hospitales
        'nombre_entidad',
        'direccion',
        'telefono',
        'correo',

        // zona de riesgo, mapa con alerta de seguridad recientes
        'tipo_riesgo',
        'ubicacion_riesgo',
        'hora_riesgo',
        'fecha_riesgo'
    ];



}
