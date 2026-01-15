<?php

namespace App\Http\Controllers;

use App\Models\Gestion_Tributaria_Pagos;
use Illuminate\Http\Request;
use App\Http\Resources\GestionTributariaPagosResource;

class GestionTributariaPagosController extends Controller
{
    public function index()
    {
        return GestionTributariaPagosResource::collection(Gestion_Tributaria_Pagos::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'codigo_contribuyente' => 'sometimes|string|max:255',
            'periodo_tributario' => 'sometimes|string|max:255',
            'tipo_impuesto' => 'sometimes|string|max:255',
            'monto_pago' => 'sometimes|numeric',
            'fecha_pago' => 'sometimes|date',
            'metodo_pago' => 'sometimes|string|max:255',
            'estado_cuenta' => 'sometimes|string|max:255',
            'numero_recibo' => 'sometimes|string|max:255',
            'fecha_emision' => 'sometimes|date',
            'importe_total' => 'sometimes|numeric',
            'detalle_servicios' => 'sometimes|string',
            'enlace_pdf' => 'sometimes|string|max:255',
            'tipo_beneficio' => 'sometimes|string|max:255',
            'descripcion_beneficio' => 'sometimes|string',
            'descuento_aplicado' => 'sometimes|numeric',
            'vigencia_beneficio' => 'sometimes|date',
        ]);

        $pago = Gestion_Tributaria_Pagos::create($validated);

        return new GestionTributariaPagosResource($pago);
    }

    public function show(Gestion_Tributaria_Pagos $pago)
    {
        return new GestionTributariaPagosResource($pago);
    }

    public function update(Request $request, Gestion_Tributaria_Pagos $pago)
    {
        $validated = $request->validate([
            'codigo_contribuyente' => 'sometimes|string|max:255',
            'periodo_tributario' => 'sometimes|string|max:255',
            'tipo_impuesto' => 'sometimes|string|max:255',
            'monto_pago' => 'sometimes|numeric',
            'fecha_pago' => 'sometimes|date',
            'metodo_pago' => 'sometimes|string|max:255',
            'estado_cuenta' => 'sometimes|string|max:255',
            'numero_recibo' => 'sometimes|string|max:255',
            'fecha_emision' => 'sometimes|date',
            'importe_total' => 'sometimes|numeric',
            'detalle_servicios' => 'sometimes|string',
            'enlace_pdf' => 'sometimes|string|max:255',
            'tipo_beneficio' => 'sometimes|string|max:255',
            'descripcion_beneficio' => 'sometimes|string',
            'descuento_aplicado' => 'sometimes|numeric',
            'vigencia_beneficio' => 'sometimes|date',
        ]);

        $pago->update($validated);

        return new GestionTributariaPagosResource($pago);
    }

    public function destroy(Gestion_Tributaria_Pagos $pago)
    {
        $pago->delete();

        return response()->json(null, 204);
    }
}