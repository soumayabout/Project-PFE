<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response([
                    'message' => 'Adresse e-mail ou mot de passe invalide',
                    'errors' => $validator->errors()
                ], 400);
            }

            if (Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();
                $token = $user->createToken('app')->plainTextToken;

                return response([
                    'message' => "Connexion réussie",
                    'token' => $token,
                    'user' => $user
                ]);
            }

            return response([
                'message' => 'Adresse e-mail ou mot de passe invalide'
            ], 401);
        } catch (\Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 500);
        }
    }


    public function register(Request $request)
    {
        try {
            $request->validate(
                [
                    'name' => 'required|string|max:255',
                    'email' => 'required|string|email|max:255|unique:users',
                    'password' => 'required|string|min:8|confirmed',
                    'role' => 'required',
                ]
            );
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                'message' => 'Utilisateur enregistré avec succès',
                'user' => $user
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage()
            ], 500);
        }
    }

    public function user()
    {
        try {
            if (Auth::check()) {
                return Auth::user();
            } else {
                return response()->json(['error' => 'Token manquant ou invalide'], 401);
            }
        } catch (Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }


    public function index()
    {
        try {
            $users = User::all();

            return response()->json(
                ['message' => 'Liste des utilisateurs récupérée avec succès.', 'data' => $users],
                200
            );
        } catch (\Exception $exception) {
            return response()->json(
                ['message' => $exception->getMessage()],
                400
            );
        }
    }
    public function getTotalUsers()
    {
        try {
            $totalUsers = User::count();
            return response()->json(['total' => $totalUsers], 200);
        } catch (\Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 400);
        }
    }
}
