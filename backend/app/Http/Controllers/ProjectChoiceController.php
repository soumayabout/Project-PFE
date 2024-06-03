<?php

namespace App\Http\Controllers;

use App\Models\ProjectChoice;
use Illuminate\Http\Request;

class ProjectChoiceController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'project_id' => 'required|exists:projects,id',
            ]);

            $existingChoice = ProjectChoice::where('user_id', $request->user_id)->first();

            if ($existingChoice) {
                return response()->json(
                    ['message' => 'Vous avez déjà choisi un projet.'],
                    400
                );
            }

            // Créez un nouveau choix de projet
            $projectChoice = ProjectChoice::create([
                'user_id' => $request->user_id,
                'project_id' => $request->project_id,
            ]);

            return response()->json(
                ['message' => 'Projet choisi avec succès.', 'data' => $projectChoice],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }


    public function getUserProject($studentId)
    {
        try {
            $projectChoice = ProjectChoice::where('user_id', $studentId)->with('project.specialty')->first();

            if (!$projectChoice) {
                return response()->json(
                    ['message' => 'Aucun projet choisi par cet étudiant.'],
                    404
                );
            }

            $projectDetails = [
                'project_name' => $projectChoice->project->project_name,
                'project_description' => $projectChoice->project->project_description,
                'specialty' => $projectChoice->project->specialty->specialty_name,
            ];

            return response()->json(
                ['message' => 'Détails du projet choisi récupérés avec succès.', 'data' => $projectDetails],
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
            $projectChoices = ProjectChoice::with(['user', 'project'])->get();

            return response()->json(
                ['message' => 'Liste des projets choisis récupérée avec succès.', 'data' => $projectChoices],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }
}
