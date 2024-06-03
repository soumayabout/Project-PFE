<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Specialty;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Création des utilisateurs
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin@123'),
            'role' => "admin"
        ]);
        User::create([
            'name' => 'Etudiant',
            'email' => 'etudiant@example.com',
            'password' => Hash::make('etudiant@123'),
            'role' => "etudiant"
        ]);
        User::create([
            'name' => 'Professeur',
            'email' => 'professeur@example.com',
            'password' => Hash::make('professeur@123'),
            'role' => "professeur"
        ]);

        // Création des spécialités
        for ($i = 0; $i < 10; $i++) {
            Specialty::create([
                'specialty_name' => 'Specialty ' . ($i + 1),
                'specialty_description' => 'Description de la spécialité ' . ($i + 1),
            ]);
        }

        $specialties = Specialty::all();
        foreach ($specialties as $specialty) {
            Project::create([
                'user_id' => 2,
                'specialty_id' => $specialty->id,
                'project_name' => 'Projet de ' . $specialty->specialty_name,
                'project_description' => 'Description du projet de '   . $specialty->specialty_name,
            ]);
        }
    }
}