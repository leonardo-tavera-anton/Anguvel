<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // Import Authenticatable
use Laravel\Sanctum\HasApiTokens; // Import HasApiTokens

class Usuario extends Authenticatable // Extend Authenticatable
{
    use HasApiTokens, HasFactory; // Use HasApiTokens

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    public $timestamps = false;

    protected $fillable = [
        'dni',
        'nombre',
        'email', // Assuming you'll add an email column for login
        'contrasena',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'contrasena',
    ];

    /**
     * The column name of the "remember me" token.
     *
     * @var string|null
     */
    protected $rememberTokenName = null; // Sanctum doesn't use remember token

    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->contrasena;
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'id_usuario';
    }
}
