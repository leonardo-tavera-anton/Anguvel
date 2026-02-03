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

    public function show($id)
    {
        // Buscamos manualmente por tu PK personalizada para evitar fallos de Route Model Binding
        $usuario = Usuario::findOrFail($id);
        return new UsuarioResource($usuario);
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($id);

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

    public function destroy($id)
    {
        $usuario = Usuario::findOrFail($id);
        $usuario->delete();
        return response()->json(null, 204);
    }

    public function login(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'contrasena' => 'required|string',
        ]);

        $usuario = Usuario::where('nombre', $request->nombre)->first();

        // Si usas Hash::check, asegúrate que en la DB la clave se haya guardado con Hash::make
        if (!$usuario || !Hash::check($request->contrasena, $usuario->contrasena)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $token = $usuario->createToken('auth_token')->plainTextToken;

        return response()->json([
            // Cambiamos 'usuario' a 'user' para que coincida con tu login.component.ts
            'user' => [
                'id_usuario' => $usuario->id_usuario,
                'nombre' => $usuario->nombre,
                'dni' => $usuario->dni
            ],
            'token' => $token, // Simplificamos para el interceptor
            'token_type' => 'Bearer',
        ]);
    }
}