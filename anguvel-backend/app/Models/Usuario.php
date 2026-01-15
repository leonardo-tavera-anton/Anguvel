<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    public $timestamps = false;

    protected $fillable = [
        'dni',
        'nombre',
        'contrasena',
    ];


}
