#!/usr/bin/env perl

use strict;
use warnings;
use JSON;
use File::Slurper qw( read_text write_binary );
use HTTP::Tiny;
use MIME::Base64;
use Data::Dump qw( dump );

sub run_it {
    my ($cmd) = @_;
    print "$cmd\n";
    system($cmd) and die "$cmd failed: $!";
}

sub decode {
    my ($str) = @_;
    return MIME::Base64::decode_base64($str);
}

sub fetch_and_parse {
    my ( $url, $payload, $outfile ) = @_;
    my $agent = HTTP::Tiny->new();
    my $resp  = $agent->request(
        'POST', $url,
        {   content => $payload,
            headers => { 'Content-type' => 'application/json' }
        }
    );
    die "$url failed: $resp->{reason}" unless $resp->{success};
    my $body    = decode_json( $resp->{content} );
    my $b64_img = $body->{img};
    $b64_img =~ s/^data:image\/png;base64//g;
    my $img = decode($b64_img);
    write_binary( $outfile, $img );
}

my %tests = (
    'test-vr-en-payload.json'       => '/vr/en',
    'test-vr-en-nosig-payload.json' => '/vr/en',
    'test-ab-en-payload.json'       => '/av/ksav1',
);

my $base64decode = $^O eq 'linux' ? '-d' : '-D';

sub client_tests {

    for my $payload ( sort keys %tests ) {
        ( my $png = $payload ) =~ s/\.json/.png/;
        my $path = $tests{$payload};
        fetch_and_parse( "http://localhost:4501$path", read_text($payload),
            $png );

        #print "PNG saved in $png\n";
        my @out = `file $png`;

        #print @out;
        if ( grep {/PNG image data/} @out ) {
            print "PASS\n";
        }
    }

}

my $pid = fork();

if ($pid) {
    my $server_pid = fork() or exec("make run-test-server");
    print
        "Master test process $$ waiting for server $server_pid and client $pid to finish\n";
    waitpid( $pid, 0 );
    print "Child process finished\n";
    kill 'TERM', $server_pid;
    print "Sent TERM to $server_pid\n";
    exit();
}
else {
    print "Waiting for server to start ...\n";
    sleep 10;
    client_tests();
    exit();
}
