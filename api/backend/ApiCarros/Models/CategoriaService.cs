using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace ApiCarros.Models
{
    public class CategoriaService
    {
        private string BuildConnection()
        {
            MySqlConnectionStringBuilder builder = new MySqlConnectionStringBuilder();
            builder.Server = "localhost";
            builder.Database = "test";
            builder.UserID = "root";
            builder.Password = "";

            return builder.ConnectionString;
        }

        public bool GuardarCategoria(Categoria categoria)
        {
            try
            {
                using (MySqlConnection conexion = new MySqlConnection(BuildConnection()))
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("INSERT INTO categorias (Nombre_Categoria, Descripcion_Categoria) VALUES (@nombreCategoria, @descripcionCategoria)", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@nombreCategoria", categoria.Nombre_Categoria));
                        com.Parameters.Add(new MySqlParameter("@descripcionCategoria", categoria.Descripcion_Categoria));

                        int rowsAffected = com.ExecuteNonQuery();

                        return rowsAffected > 0;
                    }
                }
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public bool EliminarCategoria(int idCategoria)
        {
            try
            {
                using (MySqlCommand com = new MySqlCommand("DELETE FROM categorias WHERE ID_Categoria = @idCategoria", new MySqlConnection(BuildConnection())))
                {
                    com.Connection.Open();

                    com.Parameters.Add(new MySqlParameter("@idCategoria", idCategoria));

                    int rowsAffected = com.ExecuteNonQuery();

                    return rowsAffected > 0;
                }
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public List<Categoria> LeerCategorias()
        {
            List<Categoria> categorias = new List<Categoria>();

            MySqlConnection conexion = new MySqlConnection();
            conexion.ConnectionString = BuildConnection();

            using (MySqlCommand com = new MySqlCommand("SELECT * FROM categorias", conexion))
            {
                com.Connection.Open();
                MySqlDataReader reader = com.ExecuteReader();
                while (reader.Read())
                {
                    var categoria = new Categoria();
                    categoria.ID_Categoria = Convert.ToInt32(reader["ID_Categoria"]);
                    categoria.Nombre_Categoria = reader["Nombre_Categoria"].ToString();
                    categoria.Descripcion_Categoria = reader["Descripcion_Categoria"].ToString();

                    categorias.Add(categoria);
                }
            }

            return categorias;
        }

        public Categoria BuscarCategoria(int idCategoria)
        {
            Categoria categoria = null;

            MySqlConnection conexion = new MySqlConnection();
            conexion.ConnectionString = BuildConnection();

            using (MySqlCommand com = new MySqlCommand("SELECT * FROM categorias WHERE ID_Categoria = @idCategoria", conexion))
            {
                com.Connection.Open();
                com.Parameters.Add(new MySqlParameter("@idCategoria", idCategoria));
                MySqlDataReader reader = com.ExecuteReader();

                if (reader.Read())
                {
                    categoria = new Categoria();
                    categoria.ID_Categoria = Convert.ToInt32(reader["ID_Categoria"]);
                    categoria.Nombre_Categoria = reader["Nombre_Categoria"].ToString();
                    categoria.Descripcion_Categoria = reader["Descripcion_Categoria"].ToString();
                }
            }

            return categoria;
        }

        public bool EditarCategoria(int idCategoria, Categoria categoria)
        {
            try
            {
                using (MySqlConnection conexion = new MySqlConnection(BuildConnection()))
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("UPDATE categorias SET Nombre_Categoria = @nombreCategoria, Descripcion_Categoria = @descripcionCategoria WHERE ID_Categoria = @idCategoria", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@idCategoria", idCategoria));
                        com.Parameters.Add(new MySqlParameter("@nombreCategoria", categoria.Nombre_Categoria));
                        com.Parameters.Add(new MySqlParameter("@descripcionCategoria", categoria.Descripcion_Categoria));

                        int rowsAffected = com.ExecuteNonQuery();

                        return rowsAffected > 0;
                    }
                }
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
    }
}