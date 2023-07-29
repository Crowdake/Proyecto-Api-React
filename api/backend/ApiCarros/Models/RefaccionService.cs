using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace test_api2.Models
{
    public class RefaccionService
    {
        private string BuildConnection()
        {
            // Configura la cadena de conexión a la base de datos MySQL
            MySqlConnectionStringBuilder builder = new MySqlConnectionStringBuilder
            {
                Server = "localhost",
                Database = "test",
                UserID = "root",
                Password = ""
            };

            return builder.ConnectionString;
        }

        public bool GuardarRefaccion(Refaccion refaccion)
        {
            try
            {
                using (MySqlConnection conexion = new MySqlConnection(BuildConnection()))
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("INSERT INTO refacciones (ID_Categoria, ID_Carro, Stock, Precio, Nombre_Refaccion, Descripcion_Refaccion) VALUES (@ID_Categoria, @ID_Carro, @Stock, @Precio, @Nombre_Refaccion, @Descripcion_Refaccion)", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@ID_Categoria", refaccion.ID_Categoria));
                        com.Parameters.Add(new MySqlParameter("@ID_Carro", refaccion.ID_Carro));
                        com.Parameters.Add(new MySqlParameter("@Stock", refaccion.Stock));
                        com.Parameters.Add(new MySqlParameter("@Precio", refaccion.Precio));
                        com.Parameters.Add(new MySqlParameter("@Nombre_Refaccion", refaccion.Nombre_Refaccion));
                        com.Parameters.Add(new MySqlParameter("@Descripcion_Refaccion", refaccion.Descripcion_Refaccion));

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

        public bool EliminarRefaccion(int idRefaccion)
        {
            try
            {
                using (MySqlConnection conexion = new MySqlConnection(BuildConnection()))
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("DELETE FROM refacciones WHERE ID_Refaccion = @ID_Refaccion", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@ID_Refaccion", idRefaccion));

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

        public List<Refaccion> LeerRefacciones()
        {
            List<Refaccion> refacciones = new List<Refaccion>();

            MySqlConnection conexion = new MySqlConnection();
            conexion.ConnectionString = BuildConnection();

            using (MySqlCommand com = new MySqlCommand("SELECT * FROM refacciones", conexion))
            {
                com.Connection.Open();
                MySqlDataReader reader = com.ExecuteReader();

                while (reader.Read())
                {
                    var refaccion = new Refaccion();
                    refaccion.ID_Refaccion = Convert.ToInt32(reader["ID_Refaccion"]);
                    refaccion.ID_Categoria = Convert.ToInt32(reader["ID_Categoria"]);
                    refaccion.ID_Carro = Convert.ToInt32(reader["ID_Carro"]);
                    refaccion.Stock = Convert.ToInt32(reader["Stock"]);
                    refaccion.Precio = Convert.ToSingle(reader["Precio"]);
                    refaccion.Nombre_Refaccion = reader["Nombre_Refaccion"].ToString();
                    refaccion.Descripcion_Refaccion = reader["Descripcion_Refaccion"].ToString();

                    refacciones.Add(refaccion);
                }

                return refacciones;
            }
        }

        public Refaccion BuscarRefaccion(int idRefaccion)
        {
            Refaccion refaccion = null;

            MySqlConnection conexion = new MySqlConnection();
            conexion.ConnectionString = BuildConnection();

            using (MySqlCommand com = new MySqlCommand("SELECT * FROM refacciones WHERE ID_Refaccion = @ID_Refaccion", conexion))
            {
                com.Connection.Open();
                com.Parameters.Add(new MySqlParameter("@ID_Refaccion", idRefaccion));
                MySqlDataReader reader = com.ExecuteReader();

                if (reader.Read())
                {
                    refaccion = new Refaccion();
                    refaccion.ID_Refaccion = Convert.ToInt32(reader["ID_Refaccion"]);
                    refaccion.ID_Categoria = Convert.ToInt32(reader["ID_Categoria"]);
                    refaccion.ID_Carro = Convert.ToInt32(reader["ID_Carro"]);
                    refaccion.Stock = Convert.ToInt32(reader["Stock"]);
                    refaccion.Precio = Convert.ToSingle(reader["Precio"]);
                    refaccion.Nombre_Refaccion = reader["Nombre_Refaccion"].ToString();
                    refaccion.Descripcion_Refaccion = reader["Descripcion_Refaccion"].ToString();
                }
            }

            return refaccion;
        }

        public bool EditarRefaccion(int idRefaccion, Refaccion refaccion)
        {
            try
            {
                using (MySqlConnection conexion = new MySqlConnection(BuildConnection()))
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("UPDATE refacciones SET ID_Categoria = @ID_Categoria, ID_Carro = @ID_Carro, Stock = @Stock, Precio = @Precio, Nombre_Refaccion = @Nombre_Refaccion, Descripcion_Refaccion = @Descripcion_Refaccion WHERE ID_Refaccion = @ID_Refaccion", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@ID_Refaccion", idRefaccion));
                        com.Parameters.Add(new MySqlParameter("@ID_Categoria", refaccion.ID_Categoria));
                        com.Parameters.Add(new MySqlParameter("@ID_Carro", refaccion.ID_Carro));
                        com.Parameters.Add(new MySqlParameter("@Stock", refaccion.Stock));
                        com.Parameters.Add(new MySqlParameter("@Precio", refaccion.Precio));
                        com.Parameters.Add(new MySqlParameter("@Nombre_Refaccion", refaccion.Nombre_Refaccion));
                        com.Parameters.Add(new MySqlParameter("@Descripcion_Refaccion", refaccion.Descripcion_Refaccion));

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