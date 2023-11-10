// Press Shift twice to open the Search Everywhere dialog and type `show whitespaces`,
// then press Enter. You can now see whitespace characters in your code.
public class Main {
    public static void main(String[] args) {
        // Moștenire simplă
        Dog dog = new Dog();
        dog.eat();
        dog.ham();

        // Moștenire multiplă
        MultipleInheritance multipleInheritanceExample = new MultipleInheritance();
        multipleInheritanceExample.methodA();
        multipleInheritanceExample.methodB();

        // Polimorfism la nivel de compilare
        CompilePolymorphism compilePolymorphism = new CompilePolymorphism();
        System.out.println(compilePolymorphism.add(5, 10));
        System.out.println(compilePolymorphism.add(5.5, 10.5));

        // Polimorfism la nivel de runtime
        RuntimePolymorphism polymorphism = new SubclassPolymorphism();
        polymorphism.display();

        // Abstractizare
        Shape circle = new Circle();
        circle.draw();

        Shape square = new Square();
        square.draw();
    }
}