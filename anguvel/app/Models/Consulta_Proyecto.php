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
        'titulo',
        'descripcion',
        'fecha_inicio_proyecto',
        'fecha_fin_proyecto',
    ];



}
