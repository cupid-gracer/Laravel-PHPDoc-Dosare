<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // $request->authenticate();

        // $request->session()->regenerate();

        $email = $request->input('email');
        $password = $request->input('password');

        $credentials =$request->except(['_token']);
        // if (Auth::attempt($credentials)) {
        //     dd(Auth::user());
        //     return redirect()->intended('dashboard')
        //                 ->withSuccess('Signed in');
        // }

        $user = User::where('email',$request->email)->first();

        if (auth()->attempt($credentials)) {
            Auth::login($user);
            return response()->json(['status' => 200, 'redirectUrl' => '/']);
        }else{
            return response()->json(['status' => 300, 'reason' => 'The given data was incorrect']);
        }
  

    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
