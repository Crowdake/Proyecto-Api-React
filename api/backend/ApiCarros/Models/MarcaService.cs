using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace ApiCarros.Models
{
    public class MarcaService
    {

        public bool GuardarMarca(Marca marca)
        {
            try
            {
                using (MySqlConnection conexion = DatabaseConnection.GetConnection())
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("INSERT INTO marcas (Nombre_Marca, Pais_Origen) VALUES (@nombreMarca, @paisOrigen)", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@nombreMarca", marca.Nombre_Marca));
                        com.Parameters.Add(new MySqlParameter("@paisOrigen", marca.Pais_Origen));

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

        public bool EliminarMarca(int idMarca)
        {
            try
            {
                MySqlConnection conexion = DatabaseConnection.GetConnection();
                using (MySqlCommand com = new MySqlCommand("DELETE FROM marcas WHERE ID_Marca = @idMarca", conexion))
                {
                    com.Connection.Open();

                    com.Parameters.Add(new MySqlParameter("@idMarca", idMarca));

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

        public List<Marca> LeerMarcas()
        {
            List<Marca> marcas = new List<Marca>();

            MySqlConnection conexion = DatabaseConnection.GetConnection();

            using (MySqlCommand com = new MySqlCommand("SELECT * FROM marcas", conexion))
            {
                com.Connection.Open();
                MySqlDataReader reader = com.ExecuteReader();
                while (reader.Read())
                {
                    var marca = new Marca();
                    marca.ID_Marca = Convert.ToInt32(reader["ID_Marca"]);
                    marca.Nombre_Marca = reader["Nombre_Marca"].ToString();
                    marca.Pais_Origen = reader["Pais_Origen"].ToString();

                    marcas.Add(marca);
                }
            }

            return marcas;
        }

        public Marca BuscarMarca(int idMarca)
        {
            Marca marca = null;

            MySqlConnection conexion = DatabaseConnection.GetConnection();

            using (MySqlCommand com = new MySqlCommand("SELECT * FROM marcas WHERE ID_Marca = @idMarca", conexion))
            {
                com.Connection.Open();
                com.Parameters.Add(new MySqlParameter("@idMarca", idMarca));
                MySqlDataReader reader = com.ExecuteReader();

                if (reader.Read())
                {
                    marca = new Marca();
                    marca.ID_Marca = Convert.ToInt32(reader["ID_Marca"]);
                    marca.Nombre_Marca = reader["Nombre_Marca"].ToString();
                    marca.Pais_Origen = reader["Pais_Origen"].ToString();
                }
            }

            return marca;
        }

        public bool EditarMarca(int idMarca, Marca marca)
        {
            try
            {
                using (MySqlConnection conexion = DatabaseConnection.GetConnection())
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("UPDATE marcas SET Nombre_Marca = @nombreMarca, Pais_Origen = @paisOrigen WHERE ID_Marca = @idMarca", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@idMarca", idMarca));
                        com.Parameters.Add(new MySqlParameter("@nombreMarca", marca.Nombre_Marca));
                        com.Parameters.Add(new MySqlParameter("@paisOrigen", marca.Pais_Origen));

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