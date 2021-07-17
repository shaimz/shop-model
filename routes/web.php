<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/api/products/slug={category}',[ProductController::class,'index']);
Route::post('/api/checkUser',[UserController::class,'checkUser']);
Route::post('/api/userInfo',[UserController::class,'getUser']);

Auth::routes();

Route::get('/{any?}', function() {
    return view('app',[
        'auth_user' => Auth::user()
    ]);
})->where('any', '.*');


