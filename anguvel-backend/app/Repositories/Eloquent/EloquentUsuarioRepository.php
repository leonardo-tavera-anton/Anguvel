<?php

namespace App\Repositories;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;

class EloquentUsuarioRepository implements UsuarioRepositoryInterface
{
    public function getAll(): Collection
    {
        return Usuario::all();
    }

    public function findById(int $id): ?Usuario
    {
        return Usuario::find($id);
    }

    public function create(array $data): Usuario
    {
        return Usuario::create($data);
    }

    public function update(int $id, array $data): ?Usuario
    {
        $usuario = Usuario::find($id);
        if ($usuario) {
            $usuario->update($data);
        }
        return $usuario;
    }

    public function delete(int $id): bool
    {
        return Usuario::destroy($id);
    }
}
