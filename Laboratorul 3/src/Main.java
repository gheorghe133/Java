// Press Shift twice to open the Search Everywhere dialog and type `show whitespaces`,
// then press Enter. You can now see whitespace characters in your code.
public class Main {
    public static void main(String[] args) {
        // Moștenire simplă
        Dog dog = new Dog("Rex");
        dog.eat();
        dog.ham();

        // Polimorfism la nivel de compilare
        CompilePolymorphism compilePoly = new CompilePolymorphism();
        System.out.println("Suma int: " + compilePoly.add(2, 3));
        System.out.println("Suma double: " + compilePoly.add(2.5, 3.5));

        // Mostenire ierarhică și abstractizare
        Circle circle = new Circle();
        circle.draw();

        Square square = new Square();
        square.draw();

        // Polimorfism la nivel de runtime
        SubclassPolymorphism subclassPoly = new SubclassPolymorphism("Hello");
        subclassPoly.display();
    }
}