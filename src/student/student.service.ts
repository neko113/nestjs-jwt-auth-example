import { Injectable } from '@nestjs/common';
import { students } from '@/db';
import {
  CreateStudentDto,
  FindStudentsResponseDto,
  StudentResponseDto,
  UpdateStudentDto,
} from '@/student/dto/student.dto';
import { randomUUID } from 'crypto';
@Injectable()
export class StudentService {
  private students = students;
  getStudents(): FindStudentsResponseDto[] {
    return this.students;
  }
  getStudentById(studentId: string): FindStudentsResponseDto {
    return this.students.find((student) => student.id === studentId);
  }
  createStudent(payload: CreateStudentDto): StudentResponseDto {
    const newStudent = { id: randomUUID(), ...payload };
    this.students.push(newStudent);
    return newStudent;
  }
  updateStudent(payload: UpdateStudentDto, id: string): StudentResponseDto {
    let updatedStudent: StudentResponseDto;

    const updatedStudentList = this.students.map((student) => {
      if (student.id === id) {
        updatedStudent = {
          id,
          ...payload,
        };
        return updatedStudent;
      } else return student;
    });

    this.students = updatedStudentList;

    return updatedStudent;
  }
  getStudentsByTeacherId(teacherId: string): FindStudentsResponseDto[] {
    return this.students.filter((student) => {
      return student.teacher === teacherId;
    });
  }
  updateStudentTeacher(teacherId: string, studentId: string): StudentResponseDto {
    let updatedStudent: StudentResponseDto;

    const updatedStudentList = this.students.map((student) => {
      if (student.id === studentId) {
        updatedStudent = {
          ...student,
          teacher: teacherId,
        };
        return updatedStudent;
      } else return student;
    });

    this.students = updatedStudentList;

    return updatedStudent;
  }
}
