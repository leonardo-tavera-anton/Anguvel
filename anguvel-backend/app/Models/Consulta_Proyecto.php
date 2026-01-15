<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consulta_Proyecto extends Model
{
    use HasFactory;

    protected $table = 'consultas_proyectos';
    protected $primaryKey = 'id_consulta_proyecto';
    public $timestamps = false;
    
    protected $fillable = [
        // buscar obras, listado de obras en ejecucion
        'codigo_snip',
        'nombre_obra',
        'presupuesto',
        'fecha_inicio',
        'fecha_fin',

        // estado avance, ver cuanto falta para que acabe la obra
        'avance_fisico', //%
        'avance_financiero', //%
        'fecha_estimada_fin',

        // empresa contratista, quien contrata la municipalidad
        'ruc',
        'razon_social',
        'nombre_supervisor',

        // evidencia fotos, antes durante y finalizada el proyecto
        'foto_antes',
        'foto_durante',
        'foto_finalizada',
        /** */
        'fecha_antes_obra',
        'fecha_durante_obra',
        'fecha_finalizada_obra',

    ];
}
