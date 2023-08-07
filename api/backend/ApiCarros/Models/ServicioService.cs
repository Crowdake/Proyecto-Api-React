using ApiCarros;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace test_api2.Models
{
    public class ServicioService
    {


        public bool GuardarServicio(Servicio servicio)
        {
            try
            {
                using (MySqlConnection conexion = DatabaseConnection.GetConnection())
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("INSERT INTO servicios (Nombre_Servicio, Precio, Descripcion_Servicio) VALUES (@Nombre_Servicio, @Precio, @Descripcion_Servicio)", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@Nombre_Servicio", servicio.Nombre_Servicio));
                        com.Parameters.Add(new MySqlParameter("@Precio", servicio.Precio));
                        com.Parameters.Add(new MySqlParameter("@Descripcion_Servicio", servicio.Descripcion_Servicio));

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

        public bool EliminarServicio(int idServicio)
        {
            try
            {
                using (MySqlConnection conexion = DatabaseConnection.GetConnection())
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("DELETE FROM servicios WHERE ID_Servicio = @ID_Servicio", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@ID_Servicio", idServicio));

                        int rowsAffected = com.ExecuteNonQuery();

                        if (rowsAffected > 0)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            catch (MySqlException e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public List<Servicio> LeerServicios()
        {
            List<Servicio> servicios = new List<Servicio>();

            MySqlConnection conexion = DatabaseConnection.GetConnection();



            using (MySqlCommand com = new MySqlCommand("SELECT * FROM servicios", conexion))
            {
                com.Connection.Open();
                MySqlDataReader reader = com.ExecuteReader();

                while (reader.Read())
                {
                    var servicio = new Servicio();
                    servicio.ID_Servicio = Convert.ToInt32(reader["ID_Servicio"]);
                    servicio.Nombre_Servicio = reader["Nombre_Servicio"].ToString();
                    servicio.Precio = Convert.ToSingle(reader["Precio"]);
                    servicio.Descripcion_Servicio = reader["Descripcion_Servicio"].ToString();

                    servicios.Add(servicio);
                }

                return servicios;
            }
        }

        public Servicio BuscarServicio(int idServicio)
        {
            Servicio servicio = null;

            MySqlConnection conexion = DatabaseConnection.GetConnection();

            using (MySqlCommand com = new MySqlCommand("SELECT * FROM servicios WHERE ID_Servicio = @ID_Servicio", conexion))
            {
                com.Connection.Open();
                com.Parameters.Add(new MySqlParameter("@ID_Servicio", idServicio));
                MySqlDataReader reader = com.ExecuteReader();

                if (reader.Read())
                {
                    servicio = new Servicio();
                    servicio.ID_Servicio = Convert.ToInt32(reader["ID_Servicio"]);
                    servicio.Nombre_Servicio = reader["Nombre_Servicio"].ToString();
                    servicio.Precio = Convert.ToSingle(reader["Precio"]);
                    servicio.Descripcion_Servicio = reader["Descripcion_Servicio"].ToString();
                }
            }

            return servicio;
        }

        public bool EditarServicio(int idServicio, Servicio servicio)
        {
            try
            {
                using (MySqlConnection conexion = DatabaseConnection.GetConnection())
                {
                    conexion.Open();

                    using (MySqlCommand com = new MySqlCommand("UPDATE servicios SET Nombre_Servicio = @Nombre_Servicio, Precio = @Precio, Descripcion_Servicio = @Descripcion_Servicio WHERE ID_Servicio = @ID_Servicio", conexion))
                    {
                        com.Parameters.Add(new MySqlParameter("@ID_Servicio", idServicio));
                        com.Parameters.Add(new MySqlParameter("@Nombre_Servicio", servicio.Nombre_Servicio));
                        com.Parameters.Add(new MySqlParameter("@Precio", servicio.Precio));
                        com.Parameters.Add(new MySqlParameter("@Descripcion_Servicio", servicio.Descripcion_Servicio));

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