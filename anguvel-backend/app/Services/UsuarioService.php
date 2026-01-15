<?php

namespace App\Services;

use App\Repositories\UsuarioRepositoryInterface;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;

class UsuarioService
{
    protected $usuarioRepository;

    public function __construct(UsuarioRepositoryInterface $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }

    public function getAllUsuarios(): Collection
    {
        return $this->usuarioRepository->getAll();
    }

    public function getUsuarioById(int $id): ?Usuario
    {
        return $this->usuarioRepository->findById($id);
    }

    public function createUsuario(array $data): Usuario
    {
        return $this->usuarioRepository->create($data);
    }

    public function updateUsuario(int $id, array $data): ?Usuario
    {
        return $this->usuarioRepository->update($id, $data);
    }

    public function deleteUsuario(int $id): bool
    {
        return $this->usuarioRepository->delete($id);
    }
}
