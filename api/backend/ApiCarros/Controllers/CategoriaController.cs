using Microsoft.AspNetCore.Mvc;
using ApiCarros.Models;
using System.Collections.Generic;

namespace ApiCarros.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {
        [HttpGet]
        public List<Categoria> ObtenerCategorias()
        {
            var categoriaService = new CategoriaService();
            return categoriaService.LeerCategorias();
        }

        [HttpGet("{id:int}")]
        public Categoria ObtenerCategoria(int id)
        {
            var categoriaService = new CategoriaService();
            return categoriaService.BuscarCategoria(id);
        }

        [HttpPost]
        public IActionResult AgregarCategoria([FromBody] Categoria categoria)
        {
            var categoriaService = new CategoriaService();
            var res = categoriaService.GuardarCategoria(categoria);

            if (res)
                return Ok("Guardado con éxito");
            else
                return Ok("Error al guardar");
        }

        [HttpDelete("{id:int}")]
        public IActionResult EliminarCategoria(int id)
        {
            var categoriaService = new CategoriaService();
            var res = categoriaService.EliminarCategoria(id);
            if (res)
                return Ok("Eliminado con éxito");
            else
                return Ok("Error al eliminar");
        }

        [HttpPut("{id:int}")]
        public IActionResult EditarCategoria(int id, [FromBody] Categoria categoria)
        {
            var categoriaService = new CategoriaService();
            var res = categoriaService.EditarCategoria(id, categoria);

            if (res)
                return Ok("Editado con éxito");
            else
                return Ok("Error al editar");
        }
    }
}