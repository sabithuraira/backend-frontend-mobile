package com.dev.kotlinapp

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.dev.kotlinapp.databinding.RowTodoBinding

class TodoAdapter(private val todos: List<Todo>)
    : RecyclerView.Adapter<TodoAdapter.ListViewHolder>()
{
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ListViewHolder {
        val binding = RowTodoBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ListViewHolder(binding)
    }

    private lateinit var onItemClick: OnItemClickInterface

    fun setOnItemClick(onItemClick: OnItemClickInterface){
        this.onItemClick = onItemClick
    }

    interface OnItemClickInterface{
        fun onClicked(todo: Todo)
    }

    override fun onBindViewHolder(holder: ListViewHolder, position: Int) {
        val curTodo = todos[position]
        holder.binding.txtTitle.text = curTodo.title
        holder.binding.txtDescription.text = curTodo.description

        holder.binding.linearLayout.setOnClickListener {
            onItemClick.onClicked(todos[holder.adapterPosition])
        }
    }

    override fun getItemCount(): Int = todos.size


    class ListViewHolder(var binding: RowTodoBinding): RecyclerView.ViewHolder(binding.root)
}