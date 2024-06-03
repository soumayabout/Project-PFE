<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'specialty_id' => 'required|exists:specialties,id',
                'project_name' => 'required',
                'project_description' => 'required',
            ]);

            $project = Project::create([
                'user_id' => $request->user_id,
                'specialty_id' => $request->specialty_id,
                'project_name' => $request->project_name,
                'project_description' => $request->project_description,
            ]);

            return response()->json(
                ['message' => 'Projet créé avec succès.', 'data' => $project],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'specialty_id' => 'required|exists:specialties,id',
                'project_name' => 'required',
                'project_description' => 'required',
            ]);

            $project = Project::findOrFail($id);
            $project->update([
                'user_id' => $request->user_id,
                'specialty_id' => $request->specialty_id,
                'project_name' => $request->project_name,
                'project_description' => $request->project_description,
            ]);

            return response()->json(
                ['message' => 'Projet mis à jour avec succès.', 'data' => $project],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }

    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 5);
            $projects = Project::with('specialty')->paginate($perPage);
    
            return response()->json(
                ['message' => 'Liste des projets récupérée avec succès.', 'data' => $projects],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }
    


    public function show($id)
    {
        try {
            $project = Project::findOrFail($id);

            return response()->json(
                ['message' => 'Projet récupéré avec succès.', 'data' => $project],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }

    public function destroy($id)
    {
        try {
            $project = Project::findOrFail($id);
            $project->delete();

            return response()->json(
                ['message' => 'Projet supprimé avec succès.'],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }
    public function getTotalProjects()
    {
        try {
            $totalProjects = Project::count();
            return response()->json(['total' => $totalProjects], 200);
        } catch (\Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 400);
        }
    }
}
