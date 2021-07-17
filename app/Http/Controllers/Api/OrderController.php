<?php

namespace App\Http\Controllers\Api;

use App\Models\Api\Order;
use App\Models\Api\OrderProducts;
use App\Models\Api\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::find($id);
        return $order;

    }

    public function create()
    {

    }

    public function store(Request $request)
    {
        $products = $request->products;
        if($products){
            $user_id = Auth::id() ? Auth::id() : $request->user_id;
            $user = User::find($user_id);
            $count = 0;
            $total = $request->total;

            foreach($products as $product){
                $count += $product['quantity'];
            }

            $order = new Order();

            $order->user_id = $user_id ? $user_id : null;
            $order->count = $count;
            $order->total = $total;
            $order->email = isset($user->email) ? $user->email : (isset($request->email) ? $request->email : '');
            $order->phone = isset($user->phone) ? $user->phone : (isset($request->phone) ? $request->phone : '');
            $order->save();

            foreach($products as $product){
                $order_product = new OrderProducts();
                $order_product->order_id = $order->id;
                $order_product->product_id = $product['id'];
                $order_product->save();
            }

            return response()->json();
        }

        return response('', 404)->json();
    }
}
