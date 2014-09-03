using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PanelsExample.Models {

    public enum Game {
        Cricket,
        Football,
        Hockey
    }

    [Table("Players")]
    public class Player {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Game Game { get; set; }
    }

}