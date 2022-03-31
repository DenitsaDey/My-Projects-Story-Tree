﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StoryTree.Data;

namespace StoryTree.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220330080300_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.15")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("StoryTree.Models.Image", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("MemberId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("MemberId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("StoryTree.Models.Profile", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime?>("Birthday")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Parent1Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Parent2Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("PartnerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfilePic")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Parent1Id");

                    b.HasIndex("Parent2Id");

                    b.HasIndex("PartnerId");

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("StoryTree.Models.RelationToMe", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("MemberId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Relation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RelativeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("MemberId");

                    b.ToTable("Relations");
                });

            modelBuilder.Entity("StoryTree.Models.Image", b =>
                {
                    b.HasOne("StoryTree.Models.Profile", "Member")
                        .WithMany("Images")
                        .HasForeignKey("MemberId");

                    b.Navigation("Member");
                });

            modelBuilder.Entity("StoryTree.Models.Profile", b =>
                {
                    b.HasOne("StoryTree.Models.Profile", "Parent1")
                        .WithMany()
                        .HasForeignKey("Parent1Id");

                    b.HasOne("StoryTree.Models.Profile", "Parent2")
                        .WithMany()
                        .HasForeignKey("Parent2Id");

                    b.HasOne("StoryTree.Models.Profile", "Partner")
                        .WithMany()
                        .HasForeignKey("PartnerId");

                    b.Navigation("Parent1");

                    b.Navigation("Parent2");

                    b.Navigation("Partner");
                });

            modelBuilder.Entity("StoryTree.Models.RelationToMe", b =>
                {
                    b.HasOne("StoryTree.Models.Profile", "Member")
                        .WithMany("FamilyMembers")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Member");
                });

            modelBuilder.Entity("StoryTree.Models.Profile", b =>
                {
                    b.Navigation("FamilyMembers");

                    b.Navigation("Images");
                });
#pragma warning restore 612, 618
        }
    }
}