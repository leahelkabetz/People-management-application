using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using PeopleManagerAPI.Models;

namespace PeopleManagerAPI.Data;

public partial class mycontext : DbContext
{
    public mycontext()
    {
    }

    public mycontext(DbContextOptions<mycontext> options)
        : base(options)
    {
    }

    public virtual DbSet<Person> People { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Person__3214EC0724A298B7");

            entity.ToTable("Person");

            entity.HasIndex(e => e.IdentityNumber, "UQ__Person__6354A73F8ABABB1D").IsUnique();

            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.IdentityNumber).HasMaxLength(9);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsRequired() 
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");

        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
