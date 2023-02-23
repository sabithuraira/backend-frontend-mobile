package com.dev.kotlinapp

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.Navigation
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.dev.kotlinapp.databinding.FragmentFirstBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * A simple [Fragment] subclass as the default destination in the navigation.
 */
class FirstFragment : Fragment() {

    private var _binding: FragmentFirstBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentFirstBinding.inflate(inflater, container, false)
        return binding.root

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

//        binding.buttonFirst.setOnClickListener {
//            findNavController().navigate(R.id.action_FirstFragment_to_SecondFragment)
//        }
        val layoutManager = LinearLayoutManager(requireContext())
        binding.rvTodos.layoutManager = layoutManager
        val itemDirection = DividerItemDecoration(requireContext(), layoutManager.orientation)
        binding.rvTodos.addItemDecoration(itemDirection)

        loadTodos(view)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun loadTodos(view: View){
        val client = ApiConfig.getApiService().todos()
        client.enqueue(object: Callback<List<Todo>>{
            override fun onFailure(call: Call<List<Todo>>, t: Throwable) {
                Log.e("error", t.message!!)
            }

            override fun onResponse(call: Call<List<Todo>>, response: Response<List<Todo>>) {
                if(response.body()===null){
                    Log.e("error", "Data is null")
                }
                else{
                    //response.body() ===> List<Todo> ini adalah daftar TODO dari API
                    val todoAdapter = TodoAdapter(response.body()!!)
                    binding.rvTodos.adapter = todoAdapter
                    todoAdapter.setOnItemClick(object: TodoAdapter.OnItemClickInterface{
                        override fun onClicked(todo: Todo) {
                            val destinationFragment = FirstFragmentDirections.actionFirstFragmentToSecondFragment(
                                todo.id!!, todo.title!!, todo.description!!
                            )
                            Navigation.findNavController(view).navigate(destinationFragment)
                        }
                    })
                }
            }
        })
    }
}