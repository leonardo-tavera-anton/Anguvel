<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incidencias extends Model
{
    use HasFactory;

    protected $table = 'Incidencias';
    protected $primaryKey = 'id_incidencia';
    public $timestamps = false;
    
    protected $fillable = [
        // reporte incidencias, baches, luces apagadas, basura, etc.
        'categoria',
        'descripcion',
        'ubicacion_incidencia',
        'fecha_incidencia',
        'hora_incidencia',
        'foto_adjunta',

        // seguimiento ticket, ver estado del reporte de indicencias
        'numero_ticket',
        'estado', /** pendiente/en proceso/resuelto */

        // mapa de obras, informacion sobre reparaciones de via publica
        'ubicacion_mapa',
        'empresa_ejecutora',
        'fecha_inicio',
        'fecha_fin',
    ];
}
