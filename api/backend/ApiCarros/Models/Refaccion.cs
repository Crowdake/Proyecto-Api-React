namespace test_api2.Models
{
    public class Refaccion
    {
        public int ID_Refaccion { get; set; }
        public int ID_Categoria { get; set; }
        public int ID_Carro { get; set; }
        public int Stock { get; set; }
        public float Precio { get; set; }
        public string Nombre_Refaccion { get; set; }
        public string Descripcion_Refaccion { get; set; }
    }
}
