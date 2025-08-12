using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PeopleManagerAPI.Models;

public partial class Person
{
    public int Id { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 2)]
    public string FirstName { get; set; } = null!;

    [Required]
    [StringLength(50, MinimumLength = 2)]
    public string LastName { get; set; } = null!;

    [Required]
    [RegularExpression(@"^\d{9}$", ErrorMessage = "תעודת זהות צריכה להכיל בדיוק 9 ספרות")]
    public string IdentityNumber { get; set; } = null!;

    [Required]
    [Phone(ErrorMessage = "מספר טלפון לא תקין")]
    public string PhoneNumber { get; set; } = null!;

    [Required]
    [EmailAddress(ErrorMessage = "כתובת מייל לא תקינה")]
    public string Email { get; set; } = null!;
}
