<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ProjectChoiceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SpecialtyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('users')->group(function () {
    Route::get('/', [AuthController::class, 'index']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->get('/check-token', function () {
    return response()->json(['message' => 'Token is valid'], 200);
});
Route::get('/api/admin/users/total', [AuthController::class, 'getTotalUsers']);
Route::get('/api/admin/specialties/total', [SpecialtyController::class, 'getTotalSpecialties']);
Route::get('/api/admin/projects/total', [ProjectController::class, 'getTotalProjects']);

Route::prefix('specialties')->group(function () {
    Route::post('/', [SpecialtyController::class, 'store']);
    Route::put('/{id}/update', [SpecialtyController::class, 'update']);
    Route::delete('/{id}/delete', [SpecialtyController::class, 'destroy']);
    Route::get('/{id}/show', [SpecialtyController::class, 'show']);
    Route::get('/', [SpecialtyController::class, 'index']);
});

Route::prefix('projects')->group(function () {
    Route::post('/', [ProjectController::class, 'store']);
    Route::put('/{id}/update', [ProjectController::class, 'update']);
    Route::delete('/{id}/delete', [ProjectController::class, 'destroy']);
    Route::get('/{id}/show', [ProjectController::class, 'show']);
    Route::get('/', [ProjectController::class, 'index']);
    Route::post('/choices', [ProjectChoiceController::class, 'store']);
    Route::get('/choices/{studentId}', [ProjectChoiceController::class, 'getUserProject']);
    Route::get('/choosed', [ProjectChoiceController::class, 'index']);

});