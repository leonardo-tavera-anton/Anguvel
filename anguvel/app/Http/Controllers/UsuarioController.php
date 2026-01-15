<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Http\Resources\UsuarioResource;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index()
    {
        return UsuarioResource::collection(Usuario::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'dni' => 'required|string|max:8|unique:usuarios',
            'nombre' => 'required|string|max:255',
            'contrasena' => 'required|string|min:8',
        ]);

        $validated['contrasena'] = Hash::make($validated['contrasena']);

        $usuario = Usuario::create($validated);

        return new UsuarioResource($usuario);
    }

    public function show(Usuario $usuario)
    {
        return new UsuarioResource($usuario);
    }

    public function update(Request $request, Usuario $usuario)
    {
        $validated = $request->validate([
            'dni' => 'sometimes|string|max:8|unique:usuarios,dni,' . $usuario->id_usuario . ',id_usuario',
            'nombre' => 'sometimes|string|max:255',
            'contrasena' => 'sometimes|string|min:8',
        ]);

        if ($request->has('contrasena')) {
            $validated['contrasena'] = Hash::make($validated['contrasena']);
        }

        $usuario->update($validated);

        return new UsuarioResource($usuario);
    }

    public function destroy(Usuario $usuario)
    {
        $usuario->delete();

        return response()->json(null, 204);
    }

    public function login(Request $request)
    {
        $request->validate([
            'dni' => 'required|string|max:8',
            'contrasena' => 'required|string',
        ]);

        $usuario = Usuario::where('dni', $request->dni)->first();

        if (!$usuario || !Hash::check($request->contrasena, $usuario->contrasena)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        return new UsuarioResource($usuario);
    }
}