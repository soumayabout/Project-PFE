<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Specialty; 

class SpecialtyController extends Controller
{

    public function store(Request $request)
    {
        try {
            $request->validate([
                'specialty_name' => 'required',
                'specialty_description' => 'nullable',
            ], [
                'specialty_name.required' => 'Le nom de la spécialité est requis.',
                'specialty_description.required' => 'La description de la spécialité est requise.',
            ]);

            $specialty = Specialty::create([
                'specialty_name' => $request->specialty_name,
                'specialty_description' => $request->specialty_description,
            ]);

            return response()->json(
                ['message' => 'Spécialisation créée avec succès.', 'data' => $specialty],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }

    public function update(Request $request, int $id)
    {
        try {
            $request->validate([
                'specialty_name' => 'required',
                'specialty_description' => 'nullable',
            ], [
                'specialty_name.required' => 'Le nom de la spécialité est requis.',
                'specialty_description.required' => 'La description de la spécialité est requise.',
            ]);

            $specialty = Specialty::findOrFail($id);
            $specialty->update([
                'specialty_name' => $request->specialty_name,
                'specialty_description' => $request->specialty_description,
            ]);

            return response()->json(
                ['message' => 'Spécialisation mise à jour avec succès.', 'data' => $specialty],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }

    public function destroy(int $id)
    {
        try {
            $specialty = Specialty::findOrFail($id);
            $specialty->delete();

            return response()->json(
                ['message' => 'Spécialisation supprimée avec succès.'],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }

    public function index()
    {
        try {
            $specialties = Specialty::all();

            return response()->json(
                ['message' => 'Liste des spécialisations récupérée avec succès.', 'data' => $specialties],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }

    public function show(int $id)
    {
        try {
            $specialty = Specialty::findOrFail($id);

            return response()->json(
                ['message' => 'Détails de la spécialité récupérés avec succès.', 'data' => $specialty],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }
    public function getTotalSpecialties()
    {
        try {
            $totalSpecialties = Specialty::count()->get();
            return response()->json(['total' => $totalSpecialties], 200);
        } catch (\Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 400);
        }
    }
}