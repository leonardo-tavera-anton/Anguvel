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
        'numero_ticket', 
        'estado', 
        'categoria', 
        'subcategoria', 
        'descripcion', 
        'ubicacion_incidencia', 
        'latitud', 
        'longitud', 
        'fecha_incidencia', 
        'hora_incidencia', 
        'foto_adjunta',
        'id_usuario',
    ];

    // Relación con Facultad
    public function facultad()
    {
        return $this->belongsTo(Facultad::class, 'id_facultad', 'id_facultad');
    }



    public function getRouteKeyName()
    {
        return 'id_reporte_incidencia';
    }
}
