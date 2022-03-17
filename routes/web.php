<?php

use Illuminate\Support\Facades\Route;

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
require __DIR__.'/auth.php';

Route::group(['middleware' => 'auth'], function () {
    Route::get('/', 'App\Http\Controllers\Step1Controller@index');
    Route::resource('/dosar_nou', 'App\Http\Controllers\Step1Controller');
    Route::resource('/poprire', 'App\Http\Controllers\Step2Controller');
    Route::resource('/eliberare', 'App\Http\Controllers\Step3Controller');
    Route::resource('/virare', 'App\Http\Controllers\Step4Controller');
});

Route::get('/api/fetchtypeahead/{type}/{data}', 'App\Http\Controllers\APIController@fetchData');
Route::get('/api/getproject/{dosar_nr}/{dosar_an}', 'App\Http\Controllers\APIController@getProject');
Route::get('/api/matchfill/{from}/{to}/{search_val}', 'App\Http\Controllers\APIController@matchFill');

