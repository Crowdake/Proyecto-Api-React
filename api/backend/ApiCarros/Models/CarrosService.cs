using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace test_api2.Models
{
    public class CarroService
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

        public bool GuardarCarro(Carros carro)
        {
            try
            {
                using (MySqlConnection conexion = new MySqlConnection(BuildConnection()))
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("INSERT INTO carros (ID_Marca, ID_Categoria, Modelo, Anio, Precio_Base) VALUES (@idMarca, @idCategoria, @modelo, @anio, @precioBase)", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@idMarca", carro.ID_Marca));
                        com.Parameters.Add(new MySqlParameter("@idCategoria", carro.ID_Categoria));
                        com.Parameters.Add(new MySqlParameter("@modelo", carro.Modelo));
                        com.Parameters.Add(new MySqlParameter("@anio", carro.Anio));
                        com.Parameters.Add(new MySqlParameter("@precioBase", carro.Precio_Base));
                        

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

        public bool EliminarCarro(int idCarro)
        {
            try
            {
                using (MySqlCommand com = new MySqlCommand("DELETE FROM carros WHERE ID_Carro = @idCarro", new MySqlConnection(BuildConnection())))
                {
                    com.Connection.Open();

                    com.Parameters.Add(new MySqlParameter("@idCarro", idCarro));

                    int rowsAffected = com.ExecuteNonQuery();

                    return true;
                }
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public List<Carros> LeerCarros()
        {
            List<Carros> carros = new List<Carros>();

            MySqlConnection conexion = new MySqlConnection();
            conexion.ConnectionString = BuildConnection();

            using (MySqlCommand com = new MySqlCommand("SELECT * FROM carros", conexion))
            {
                com.Connection.Open();
                MySqlDataReader reader = com.ExecuteReader();
                while (reader.Read())
                {
                    var carro = new Carros();
                    carro.ID_Carro = Convert.ToInt32(reader["ID_Carro"]);
                    carro.ID_Marca = Convert.ToInt32(reader["ID_Marca"]);
                    carro.Modelo = reader["Modelo"].ToString();
                    carro.Anio = Convert.ToInt32(reader["Anio"]);
                    carro.Precio_Base = Convert.ToDecimal(reader["Precio_Base"]);
                    carro.ID_Categoria = Convert.ToInt32(reader["ID_Categoria"]);

                    carros.Add(carro);
                }
            }

            return carros;
        }

        public Carros BuscarCarro(int idCarro)
        {
            Carros carro = null;

            MySqlConnection conexion = new MySqlConnection();
            conexion.ConnectionString = BuildConnection();

            using (MySqlCommand com = new MySqlCommand("SELECT * FROM carros WHERE ID_Carro = @idCarro", conexion))
            {
                com.Connection.Open();
                com.Parameters.Add(new MySqlParameter("@idCarro", idCarro));
                MySqlDataReader reader = com.ExecuteReader();

                if (reader.Read())
                {
                    carro = new Carros();
                    carro.ID_Carro = Convert.ToInt32(reader["ID_Carro"]);
                    carro.ID_Marca = Convert.ToInt32(reader["ID_Marca"]);
                    carro.Modelo = reader["Modelo"].ToString();
                    carro.Anio = Convert.ToInt32(reader["Anio"]);
                    carro.Precio_Base = Convert.ToDecimal(reader["Precio_Base"]);
                    carro.ID_Categoria = Convert.ToInt32(reader["ID_Categoria"]);
                }
            }

            return carro;
        }

        public bool EditarCarro(int idCarro, Carros carro)
        {
            try
            {
                using (MySqlConnection conexion = new MySqlConnection(BuildConnection()))
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("UPDATE carros SET ID_Marca = @idMarca, ID_Categoria = @idCategoria, Modelo = @modelo, Anio = @anio, Precio_Base = @precioBase WHERE ID_Carro = @idCarro", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@idCarro", idCarro));
                        com.Parameters.Add(new MySqlParameter("@idMarca", carro.ID_Marca));
                        com.Parameters.Add(new MySqlParameter("@idCategoria", carro.ID_Categoria));
                        com.Parameters.Add(new MySqlParameter("@modelo", carro.Modelo));
                        com.Parameters.Add(new MySqlParameter("@anio", carro.Anio));
                        com.Parameters.Add(new MySqlParameter("@precioBase", carro.Precio_Base));
                        

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
