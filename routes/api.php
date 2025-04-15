<?php

use App\Http\Controllers\API\v1\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Route::prefix('/task')->group(function () {
//     Route::get('/', [TaskController::class, 'index']);
//     Route::post('/create', [TaskController::class, 'store']);
//     Route::put('/update/{id}', [TaskController::class, 'update']);
//     Route::delete('/delete/{id}', [TaskController::class, 'destroy']);
// });

Route::apiResource('tasks', TaskController::class);