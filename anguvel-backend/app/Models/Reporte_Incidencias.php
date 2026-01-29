<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reporte_Incidencias extends Model
{
    use HasFactory;

    protected $table = 'reporte_incidencias';
    protected $primaryKey = 'id_reporte_incidencia';
    public $timestamps = false;
    
    protected $fillable = [

        // seguimiento ticket, ver estado del reporte de indicencias
        'numero_ticket',
        'estado', /** pendiente/en proceso/resuelto */

        // reporte incidencias, baches, luces apagadas, basura, etc.
        'categoria',
        'subcategoria',
        'descripcion',
        'ubicacion_incidencia',
        'latitud',
        'longitud',
        'fecha_incidencia',
        'hora_incidencia',
        'foto_adjunta',
    ];

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'id_reporte_incidencia';
    }
}
