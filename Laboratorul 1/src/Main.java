import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        // Variabile
        int numar = 10;
        String nume = "John";

        // Condiție
        if (numar > 0) {
            System.out.println(nume + " are un număr pozitiv.");
        } else {
            System.out.println(nume + " are un număr negativ sau zero.");
        }

        // Masiv de date
        int[] numere = {1, 2, 3, 4, 5};

        // Excepții
        try {
            System.out.println("Elementul de pe poziția 10: " + numere[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("ArrayIndexOutOfBoundsException: " + e.getMessage());
        }

        // Listă
        List<String> cuvinte = new ArrayList<>();
        cuvinte.add("Aceaste este");
        cuvinte.add("o lista");
        cuvinte.add("in limbajul java");

        // Stream-uri
        List<String> cuvinteMajuscule = cuvinte.stream()
                .map(String::toUpperCase)
                .collect(Collectors.toList());

        System.out.println("Cuvintele în majuscule: " + cuvinteMajuscule);
    }
}
